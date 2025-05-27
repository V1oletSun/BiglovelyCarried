from static.backEnd.app.services.drcorationService import create_decoration_app
from static.backEnd.app.services.testServices import create_test_app
from flask_cors import CORS

testapp = create_test_app()
#decorationapp = create_decoration_app()

if __name__ == '__main__':
    CORS(testapp)
    testapp.run(debug=True)
    #decorationapp.run(debug=True)