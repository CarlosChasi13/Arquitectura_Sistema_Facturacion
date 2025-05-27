# backend/controllers/__init__.py

from .paciente_controller import paciente_bp
from .descargo_controller import descargo_bp
from .factura_controller import factura_bp

__all__ = [
    "paciente_bp",
    "descargo_bp",
    "factura_bp",
]
