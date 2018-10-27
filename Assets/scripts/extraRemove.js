#pragma strict

function Start () {

}

function Update () {

}
function removeExtra()
{
	yield WaitForSeconds(2);
	GetComponent.<Animation>()["extraTaken"].speed = -1;
	GetComponent.<Animation>().Play("extraTaken");
	yield WaitForSeconds(1);
	GetComponent.<Animation>().Play("extra");
	GetComponent.<Animation>()["extraTaken"].speed = 1;
}