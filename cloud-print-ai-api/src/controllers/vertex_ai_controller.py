from marshmallow import EXCLUDE
from src.services import VertexAIService
from .anonymous_base_controller import AnonymousBaseController
from webargs.flaskparser import parser
from flask import request
from webargs import fields

vertext_args = {
    "prompt": fields.Str(required=True),
    "model_name": fields.Str()
}


class VertexAIController(AnonymousBaseController):
    def get(self):
        vertex_ai_service = VertexAIService()
        response = vertex_ai_service.get_result_from_prompt(
            "Why the sky is blue")
        return response

    def post(self):
        args = parser.parse(vertext_args, request)
        print(args)
        vertex_ai_service = VertexAIService()
        response = vertex_ai_service.get_result_from_prompt(
            args["prompt"], args["model_name"])
        return response
