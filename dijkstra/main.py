import sys

from core import *
if __name__ =="__main__":
	core = Core()
	core.initialize()
	try:
		core.start(sys.argv[1], sys.argv[2], sys.argv[3])
	except:
		print(" - Add start and end point & filename")
		print(" - Example: Python3 main.py 1 2 m.txt")
