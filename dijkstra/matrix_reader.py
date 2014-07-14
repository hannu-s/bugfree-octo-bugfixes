from node import *
class MatrixReader():
	"""docstring for MatrixReader"""
	def __init__(self, fileUrl):
		self.fileUrl = fileUrl
		self.IDs = list()
		self.nodes = list()
		self.matrix = None

	def readFile(self):
		columns = list()
		rows = list()
		try:
			with open(self.fileUrl) as openFileObject:
				for line in openFileObject:
					#remove /n
					line = line.rstrip()
					if(line[0] == "#"):
						#set infinite, from, to, split and begin markers
						line = line.split('=')
						if(line[0] == "#no_route"):
							self.noRoute = line[1]
						elif(line[0] == "#split"):
							self.split = line[1]
						elif(line[0] == "#begin"):
							self.begin = line[1]
					else:
						line = line.split(self.split)
						if(line[0] == self.begin):
							#set name of the places
							for i in range(1,len(line)):
								columns.append(line[i])
						else:
							#set each row to list, and each row to a list as an object
							row = list()
							for i in range(0,len(line)):
								row.append(line[i])
							rows.append(row)
			self.IDs = columns
			self.matrix = rows
			return True
		except :
			print("Error reading file: ", self.fileUrl)
			return False

	def createNodes(self):
		if self.matrix == None:
			print("Error, matrix is not set")
			return False
		for j in range(0, len(self.IDs)):
			#creates node, adds neighbor ids and values (if route exists)
			node = Node(self.IDs[j])
			for i in range(0,len(self.matrix)):
				#Loops each row seperately, checks wheter on IDs COLUMN has a route
				if self.matrix[i][j+1] != self.noRoute:
					node.addNeighbor( self.matrix[i][0], self.matrix[i][j+1] )
			self.nodes.append(node)
		return True

	def getNodes(self):
		return self.nodes