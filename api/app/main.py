from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import models, schemas
from .database import Base, engine, get_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Paris Group Copilot API",
    description=(
        "Backend de consolidação de contexto de MVPs do venture studio. "
        "Expõe Projetos e Hipóteses como entidades do enquadramento do produto."
    ),
    version="0.1.0",
    lifespan=lifespan,
)


@app.get("/health", tags=["Infra"])
def health():
    return {"status": "ok"}


@app.post("/projetos", response_model=schemas.ProjetoOut, status_code=201, tags=["Projetos"])
def criar_projeto(payload: schemas.ProjetoCreate, db: Session = Depends(get_db)):
    projeto = models.Projeto(**payload.model_dump())
    db.add(projeto)
    db.commit()
    db.refresh(projeto)
    return projeto


@app.get("/projetos", response_model=list[schemas.ProjetoOut], tags=["Projetos"])
def listar_projetos(db: Session = Depends(get_db)):
    return db.scalars(select(models.Projeto)).all()


@app.get("/projetos/{projeto_id}", response_model=schemas.ProjetoOut, tags=["Projetos"])
def obter_projeto(projeto_id: int, db: Session = Depends(get_db)):
    projeto = db.get(models.Projeto, projeto_id)
    if projeto is None:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return projeto


@app.post("/hipoteses", response_model=schemas.HipoteseOut, status_code=201, tags=["Hipóteses"])
def criar_hipotese(payload: schemas.HipoteseCreate, db: Session = Depends(get_db)):
    if db.get(models.Projeto, payload.projeto_id) is None:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    hipotese = models.Hipotese(**payload.model_dump())
    db.add(hipotese)
    db.commit()
    db.refresh(hipotese)
    return hipotese


@app.get(
    "/projetos/{projeto_id}/hipoteses",
    response_model=list[schemas.HipoteseOut],
    tags=["Hipóteses"],
)
def listar_hipoteses(projeto_id: int, db: Session = Depends(get_db)):
    if db.get(models.Projeto, projeto_id) is None:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return db.scalars(
        select(models.Hipotese).where(models.Hipotese.projeto_id == projeto_id)
    ).all()
