from flask_cors import CORS
from static.backEnd.app.services.testServices import create_test_app

testapp = create_test_app()
#decorationapp = create_decoration_app()

if __name__ == '__main__':
    CORS(testapp)
    testapp.run(debug=True)
    #decorationapp.run(debug=True)