import os

CUR_DIR = os.path.join(os.path.dirname(__file__))

USER_ID = 1
TASK_DAO_MOCK_FILES = {
    'get_tasks_by_user_id': os.path.join(CUR_DIR, 'data/csv/daos/task_dao/tasks.csv'),
    'get_all':  os.path.join(CUR_DIR, 'data/json/daos/task_dao/all_tasks.json')
}