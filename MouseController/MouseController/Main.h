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
	bool MoveMouse(POINT*);
	bool MouseLeftDown();
	bool MouseLeftUp();
	bool MouseLeftUp(INPUT*);
	bool MouseLeftClick();
	bool MouseRightDown();
	bool MouseRightUp();
	bool MouseRightUp(INPUT*);
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

};

int main();
