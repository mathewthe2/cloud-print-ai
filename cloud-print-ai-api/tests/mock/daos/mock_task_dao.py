import ast
import json
import pandas as pd
from tests.mock.mock_config import TASK_DAO_MOCK_FILES

def mock_get_tasks_by_user_id_succeed(self, user_id: int):
    df = pd.read_csv(TASK_DAO_MOCK_FILES['get_tasks_by_user_id'])
    return ast.literal_eval(df.to_json(orient='records'))


def mock_get_all_succeed(self):
    return json.load(open(TASK_DAO_MOCK_FILES['get_all'], 'r'))