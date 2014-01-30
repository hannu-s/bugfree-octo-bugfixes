from branch import *
from node import *
class Engine(object):
	"""docstring for Engine"""
	def __init__(self, nodes):

		self.nodes = nodes
		self.finished = False
		self.branches = list()

	def run(self, startID):
		self.initializeRun(startID)
		while self.finished == False:
			self.calculate()
		
		for b in self.branches:
			print("FROM:", b.getParentID(), "TO:", b.getNode().getID(), b.getValue())
		print()

	def initializeRun(self, startID):
		self.branches = list()
		self.used = list()
		for node in self.nodes:
			if node.getID() == startID:
				b = Branch()
				b.set(node, None, 0, True)
				self.branches.append(b)
				self.removeFromNodes(node.getID())
				break

	def removeFromNodes(self, id):
		for node in self.nodes:
			node.removeNeighborByID(id)

	def calculate(self):
		smallest = None
		neighborID = None
		b = Branch()

		for branch in self.branches:
			value = branch.getValue()
			node = branch.getNode()
			for i in range(0, len(node.getNeighbors())):
				neighbors = node.getNeighbors()
				if smallest == None or float(smallest) > float(value) + float(neighbors[i][1]):
					b = Branch()
					newNode = None
					for n in self.nodes:
						if neighbors[i][0] == n.getID():
							newNode = n
							break
					b.set(n, branch)
					b.addValue(neighbors[i][1])
					smallest = neighbors[i][1]
					neighborID = neighbors[i][0]

		if smallest != None:
			self.branches.append(b)
			self.removeFromNodes(neighborID)
		else:
			self.finished = True

	def routeTo(self, destinationID):
		tmpID = list()
		for b in self.branches:
			if (b.getNode().getID() == destinationID):
				tmpID.append(b)
				while b.isRoot() == False:
					b = b.getParent()
					tmpID.append(b)
				break

		total = 0
		if len(tmpID) > 0:
			print("Path found to ", destinationID, ":", sep="")
			for i in reversed(tmpID):
				print ("TO:", i.getNode().getID(), "VALUE:", i.getValue())
				total += i.getValue()
			print("TOTAL VALUE IS:", total)
		else:
			print("No path found")