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

	// Control buttons
	bool MouseLeftDown();
	bool MouseLeftUp();
	bool MouseLeftClick();
	bool MouseLeftClick(int);
	bool MouseRightDown();
	bool MouseRightUp();
	bool MouseRightClick();
	bool MouseRightClick(int);

	// Update
	void UpdateButtonStatus();
	
	// Getters
	bool IsLeftDown();
	bool IsRightDown();
	int GetX();
	int GetY();

	// Setters
	bool SetX(int);
	bool SetY(int);
	bool Set(int,int);
	
	// Extra
	POINT* GetMousePos();
	POINT* GetMousePos(POINT*);
	bool SetMousePos(POINT*);
	MouseButton GetLeftMouseButton();
	MouseButton GetRightMouseButton();

private:
	MouseButton left;
	MouseButton right;

	INPUT* GetInputAndMouseLeftDown();
	INPUT* GetInputAndMouseRightDown();
	bool MouseLeftUp(INPUT*);
	bool MouseRightUp(INPUT*);

};

int main();
