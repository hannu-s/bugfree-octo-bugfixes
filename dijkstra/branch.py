from node import *
class Branch():
	"""docstring for Branch"""
	def __init__(self):
		self.node = None
		self.parent = None
		self.root = None
		self.currentValue = 0

	def setNode(self, node):
		self.node = node

	def setParent(self, parent):
		self.parent = parent

	def setRoot(self, root):
		self.root = root

	def set(self, node, parentBranch, currentValue = None, root = False):
		self.node = node
		self.parent = parentBranch
		self.root = root
		if (currentValue != None):
			self.currentValue = currentValue

	def isRoot(self):
		return self.root

	def getParent(self):
		return self.parent

	def getValue(self):
		return self.currentValue

	def getParentValue(self):
		if (self.isRoot() == False):
			return self.parent.currentValue
		else:
			#print("Trying to get parent from root. id: ", self.node.id)
			return 0
		
	def getParentID(self):
		if (self.isRoot() == False):
			return self.parent.node.id
		else:
			#print("Trying to get parentID from root. id: ", self.node.id)
			return None

	def getParentNode(self):
		if (self.isRoot() == False):
			return self.parent.node
		else:
			#print("Trying to get parent node from root. id: ", self.node.id)
			return None

	def getNode(self):
		return self.node

	def addValue(self, value):
		self.currentValue = self.getParentValue()
		self.currentValue = float(self.currentValue) + float(value)

