#include "MouseController.h"

int main()
{
	MouseController* mc = new MouseController();
	POINT* p = mc->GetMousePos();
	std::cout<<"X: "<<p->x<<", Y: "<<p->y<<std::endl;
	p->x = 0;
	p->y = 0;
	mc->SetMousePos(p);
	mc->MouseRightClick();
	mc->~MouseController();
	
	delete p;
	delete mc;

	system("PAUSE");

	return 0;
}



