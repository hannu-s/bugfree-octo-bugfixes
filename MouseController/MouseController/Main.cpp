#include "MouseController.h"

int main()
{
	MouseController mc;
	POINT* p = mc.GetMousePos();
	std::cout<<"X: "<<p->x<<", Y: "<<p->y<<std::endl;
	p->x = 0;
	p->y = 0;

	mc.SetMousePos(p);
	mc.MouseRightClick();
	mc.~MouseController();

	delete p;
	system("PAUSE");

	return 0;
}



