from flask import Flask, render_template

app = Flask(__name__)

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

@app.route('/rezultati')
def results():
  return render_template('rezultati.html')


app.run(host='0.0.0.0', port=8020)
