from point import *

class Node():
	"""docstring for Node"""
	def __init__(self, id):
		self.neighbors = list()
		self.position = None
		self.name = None
		self.id = id

	def setPosition(self, point):
		self.position = p

	def addNeighbor(self, id, value):
		tmp = list()
		tmp.append(id)
		tmp.append(value)
		self.neighbors.append(tmp)

	def getNeighbors(self):
		return self.neighbors

	def getNeighbor(self, id):
		return self.neighbors[id]

	def getNeighborID(self, id):
		return self.neighbors[id][0]

	def getNeighborValue(self, id):
		return self.neighbors[id][1]

	def getPosition(self):
		return self.position

	def getID(self):
		return self.id

	def removeNeighborByID(self, id):
		for i in range(0,len(self.neighbors)):
			if (self.neighbors[i][0] == id):
				self.neighbors.pop(i)
				break