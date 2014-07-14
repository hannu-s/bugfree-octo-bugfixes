class Point():
	"""docstring for Point"""
	def __init__(self, x, y, z=0):
		self.x = x
		self.y = y
		self.z = z

	def setX(self, x):
		self.x = x

	def setY(self, y):
		self.y = y

	def setZ(self, z):
		self.z = z

	def getX(self):
		return self.x

	def getY(self):
		return self.y

	def getZ(self):
		return self.z

	def get(self):
		return self
		