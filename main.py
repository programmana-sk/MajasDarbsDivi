#from flask import Flask, render_template

#app = Flask(__name__)
from flask import Flask, render_template


app = Flask('app')

@app.route('/')
def root():
  return render_template('index.html')
#  return render_template('atminasspele.html')

@app.route('/atminasspele')
def spele():
  return render_template('atminasspele.html')

@app.route('/kalkulators')
def kalkulators():
  return render_template('kalkulators.html')
  
@app.route('/saites')
def saites():
  return render_template('saites.html')
@app.route('/veidotaji')
def veidotaji():
  return render_template('veidotaji.html')

@app.route('/rezultati')
def results():
  return render_template('rezultati.html')


#app.run(host='0.0.0.0', port=8020)
if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)