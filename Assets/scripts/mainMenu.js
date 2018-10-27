#pragma strict

var hit:RaycastHit;

function Start () {

}

function Update () {

if(Input.GetMouseButtonDown(0))
{
	if(Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition),hit))
	{
		if(hit.transform.tag == "play")
		{
			Application.LoadLevel("theGame");
		}
	}
}

}