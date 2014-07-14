#include <Windows.h>
#include <WinUser.h>
#include <exception>
#include <iostream>

enum MouseButton
{
	Released,
	Held,
};

class MouseController
{
public:
	MouseController();
	~MouseController();

	POINT* GetMousePos();
	POINT* GetMousePos(POINT*);
	bool SetMousePos(POINT*);
	bool MouseLeftDown();
	bool MouseLeftUp();
	bool MouseLeftClick();
	bool MouseRightDown();
	bool MouseRightUp();
	bool MouseRightClick();
	
	void UpdateButtonStatus();
	MouseButton GetLeftMouseButton();
	MouseButton GetRightMouseButton();
	bool IsLeftDown();
	bool IsRightDown();

private:
	MouseButton left;
	MouseButton right;

	INPUT* GetInputAndMouseLeftDown();
	INPUT* GetInputAndMouseRightDown();
	bool MouseLeftUp(INPUT*);
	bool MouseRightUp(INPUT*);

};

int main();
