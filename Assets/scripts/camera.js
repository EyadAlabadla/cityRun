#pragma strict

var player:Transform;
private var speed:float = 10;

function Start () {

}

function Update () {

transform.position.x = Mathf.Lerp(transform.position.x,player.position.x,Time.deltaTime * 3);
transform.position.y = Mathf.Lerp(transform.position.y,player.position.y + 3,Time.deltaTime*3);
transform.position.z = Mathf.Lerp(transform.position.z,player.position.z - 8,player.GetComponent.<Rigidbody>().velocity.z);

}