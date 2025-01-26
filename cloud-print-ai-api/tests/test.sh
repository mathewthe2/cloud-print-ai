TEST_DIR=/app/test_reports
cd /app
pytest --cov=. --cov-report html:$TEST_DIR/coverage --junit-xml=$TEST_DIR/junit.xml --result-log=$TEST_DIR/logs.txt