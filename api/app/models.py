import enum
from datetime import datetime, timezone

from sqlalchemy import Enum as SAEnum
from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


def _now() -> datetime:
    return datetime.now(timezone.utc)


class EstagioProjeto(str, enum.Enum):
    discovery = "discovery"
    validacao = "validacao"
    escala = "escala"
    pausado = "pausado"


class StatusHipotese(str, enum.Enum):
    a_testar = "a_testar"
    em_teste = "em_teste"
    validada = "validada"
    refutada = "refutada"


class Projeto(Base):
    __tablename__ = "projetos"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(200))
    descricao: Mapped[str] = mapped_column(Text, default="")
    estagio: Mapped[EstagioProjeto] = mapped_column(
        SAEnum(EstagioProjeto), default=EstagioProjeto.discovery
    )
    link_fonte: Mapped[str | None] = mapped_column(String(500), nullable=True)
    proximo_passo: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    hipoteses: Mapped[list["Hipotese"]] = relationship(
        back_populates="projeto", cascade="all, delete-orphan"
    )


class Hipotese(Base):
    __tablename__ = "hipoteses"

    id: Mapped[int] = mapped_column(primary_key=True)
    projeto_id: Mapped[int] = mapped_column(ForeignKey("projetos.id"))
    enunciado: Mapped[str] = mapped_column(Text)
    metrica: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[StatusHipotese] = mapped_column(
        SAEnum(StatusHipotese), default=StatusHipotese.a_testar
    )
    aprendizado: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    projeto: Mapped["Projeto"] = relationship(back_populates="hipoteses")
