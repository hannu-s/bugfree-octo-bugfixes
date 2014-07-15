#include "MouseController.h"

class MousePosException: public std::exception
{
  virtual const char* what() const throw()
  {
    return "GetCursorPos failed. Couldn't get mouse position.";
  }
} mPosExe;


/*
	Constructor.
*/
MouseController::MouseController()
{
	UpdateButtonStatus();
}
/*
	Deconstructor.
*/
MouseController::~MouseController()
{
	//Release mouse buttons if held.
	UpdateButtonStatus();
	if (left == MouseButton::Held)
	{
		MouseLeftUp();
	}
	if (right == MouseButton::Held)
	{
		MouseRightUp();
	}
}

/*
	Returns left MouseController enum.
*/
MouseButton MouseController::GetLeftMouseButton()
{
	return left;
}

/*
	Returns right MouseController enum.
*/
MouseButton MouseController::GetRightMouseButton()
{
	return right;
}

/*
	Returns bool TRUE if mouse LEFT is being held down.
*/
bool MouseController::IsLeftDown()
{
	if (left == MouseButton::Held)
		return true;
	return false;
}

/*
	Returns bool TRUE if mouse RIGHT is being held down.
*/
bool MouseController::IsRightDown()
{
	if (right == MouseButton::Held)
		return true;
	return false;
}

/*
	Updates MouseButton left and MouseButton right enums.
*/
void MouseController::UpdateButtonStatus()
{
	//Is Left mouse button is being held.
	if((GetKeyState(VK_LBUTTON) & 0x100) != 0)
		left = MouseButton::Held;
	else
		left = MouseButton::Released;
	//Is Right mouse button is being held.
	if((GetKeyState(VK_RBUTTON) & 0x100) != 0)
		right = MouseButton::Held;
	else
		right = MouseButton::Released;
}

/*
	Returns POINT where cursor currently is.
	Throws mPosExe exception if fails.
*/
POINT* MouseController::GetMousePos()
{
	POINT* cursor = new POINT();
	BOOL gotPos = GetCursorPos(cursor);
	if (!gotPos)
		throw mPosExe;
	return cursor;
}

/*
	Returns POINT where Parameter POINT cursor currently is.
	Throws mPosExe exception if fails.
*/
POINT* MouseController::GetMousePos(POINT* cursor)
{
	BOOL gotPos = GetCursorPos(cursor);
	if (!gotPos)
		throw mPosExe;
	return cursor;
}

/*
	Moves cursor to POINT.
*/
bool MouseController::SetMousePos(POINT* point)
{
	SetCursorPos(point->x, point->y);
	return true;
}

/*
	Returns Int X.
	Throws mPosExe exception if fails.
*/
int MouseController::GetX()
{
	POINT cursor;
	BOOL gotPos = GetCursorPos(&cursor);
	if (!gotPos)
		throw mPosExe;
	return (int) cursor.x;
}

/*
	Returns Int Y.
	Throws mPosExe exception if fails.
*/
int MouseController::GetY()
{
	POINT cursor;
	BOOL gotPos = GetCursorPos(&cursor);
	if (!gotPos)
		throw mPosExe;
	return (int) cursor.y;
}

/*
	Moves cursor to X in X-axis.
*/
bool MouseController::SetX(int x)
{
	POINT p;
	p.x = x;
	p.y = GetY();
	SetCursorPos(p.x, p.y);
	return true;
}

/*
	Moves cursor to Y in Y-axis.
*/
bool MouseController::SetY(int y)
{
	POINT p;
	p.x = GetX();
	p.y = y;
	SetCursorPos(p.x, p.y);
	return true;
}

/*
	Moves cursor to X and Y in XY-axis.
*/
bool MouseController::Set(int x, int y)
{
	POINT p;
	p.x = x;
	p.y = y;
	SetCursorPos(p.x, p.y);
	return true;
}