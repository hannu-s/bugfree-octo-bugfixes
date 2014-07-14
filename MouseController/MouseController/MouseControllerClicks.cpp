#include "Main.h"

/*
	Left mouse button held down.
*/
bool MouseController::MouseLeftDown()
{
	INPUT Input = {0};
	Input.type = INPUT_MOUSE;
	Input.mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
	::SendInput(1,&Input,sizeof(INPUT));
	return true;
}

/*
	Returns Input*.
	Left mouse button held down.
*/
INPUT* MouseController::GetInputAndMouseLeftDown()
{
	INPUT* Input = {0};
	Input->type = INPUT_MOUSE;
	Input->mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
	::SendInput(1,Input,sizeof(INPUT));
	return Input;
}

/*
	Left mouse button released.
*/
bool MouseController::MouseLeftUp()
{
	INPUT Input = {0};
	Input.type = INPUT_MOUSE;
	Input.mi.dwFlags = MOUSEEVENTF_LEFTUP;
	::SendInput(1,&Input,sizeof(INPUT));
	return true;
}

/*
	Left mouse button released.
	INPUT* parameter set.
*/
bool MouseController::MouseLeftUp(INPUT* i)
{
	i->mi.dwExtraInfo = MOUSEEVENTF_LEFTUP;
	::SendInput(1,i,sizeof(INPUT));
	return true;
}

bool MouseController::MouseLeftClick()
{
	return MouseLeftUp(GetInputAndMouseLeftDown());
}

/*
	Right mouse button held down.
*/
bool MouseController::MouseRightDown()
{
	INPUT Input = {0};
	Input.type = INPUT_MOUSE;
	Input.mi.dwFlags = MOUSEEVENTF_RIGHTDOWN;
	::SendInput(1,&Input,sizeof(INPUT));
	return true;
}

/*
	Right mouse button released.
*/
bool MouseController::MouseRightUp()
{
	INPUT Input = {0};
	Input.type = INPUT_MOUSE;
	Input.mi.dwFlags = MOUSEEVENTF_RIGHTUP;
	::SendInput(1,&Input,sizeof(INPUT));
	return true;
}

/*
	Returns Input*.
	Right mouse button held down.
*/
INPUT* MouseController::GetInputAndMouseRightDown()
{
	INPUT* Input = {0};
	Input->type = INPUT_MOUSE;
	Input->mi.dwFlags = MOUSEEVENTF_RIGHTDOWN;
	::SendInput(1,Input,sizeof(INPUT));
	return Input;
}

/*
	Left mouse button released.
	INPUT* parameter set.
*/
bool MouseController::MouseRightUp(INPUT* i)
{
	i->mi.dwExtraInfo = MOUSEEVENTF_RIGHTUP;
	::SendInput(1,i,sizeof(INPUT));
	return true;
}

bool MouseController::MouseRightClick()
{
	return MouseRightUp(GetInputAndMouseRightDown());
}

