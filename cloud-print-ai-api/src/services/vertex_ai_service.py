from src.constants import TaskStatus

from .base_service import BaseService
from src.exceptions import ErrorCode, WebAPIException
from src.daos import ConcreteFactory, FactoryInterface
from vertexai.generative_models import GenerativeModel
import vertexai
vertexai.init(api_transport="rest")


class VertexAIService(BaseService):
    def __init__(self, dao_factory: FactoryInterface = None):
        pass

    def get_result_from_prompt(self, prompt, model_name="gemini-pro"):
        model = GenerativeModel(model_name)
        result = model.generate_content(prompt)
        return result.text
