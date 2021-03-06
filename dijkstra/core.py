from matrix_reader import *
from engine import *
class Core:
	def __init__(self):
		pass

	def initialize(self):
		pass

	def start(self, fr, to, fileName):
		m = MatrixReader(fileName)
		if m.readFile() and m.createNodes():
			print("File read, nodes set.")
			nodes = m.getNodes()
			eng = Engine(nodes)
			eng.run(fr)
			eng.routeTo(to)

		else:
			print("Error occured with file reader")
			pass
