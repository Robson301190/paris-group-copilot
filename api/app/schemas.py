from datetime import datetime

from pydantic import BaseModel, ConfigDict

from .models import EstagioProjeto, StatusHipotese


class HipoteseBase(BaseModel):
    enunciado: str
    metrica: str = ""
    status: StatusHipotese = StatusHipotese.a_testar
    aprendizado: str | None = None


class HipoteseCreate(HipoteseBase):
    projeto_id: int


class HipoteseOut(HipoteseBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    projeto_id: int
    created_at: datetime


class ProjetoBase(BaseModel):
    nome: str
    descricao: str = ""
    estagio: EstagioProjeto = EstagioProjeto.discovery
    link_fonte: str | None = None
    proximo_passo: str | None = None


class ProjetoCreate(ProjetoBase):
    pass


class ProjetoOut(ProjetoBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    hipoteses: list[HipoteseOut] = []
