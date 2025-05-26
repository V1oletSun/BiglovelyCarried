from static.backEnd.app.services.testServices import create_apps

app = create_apps()

if __name__ == '__main__':
    app.run(debug=True)