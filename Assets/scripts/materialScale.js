#pragma strict

function Awake()
{
	//transform.renderer.material.mainTextureScale.x = transform.localScale.x;
	//transform.renderer.material.mainTextureScale.y = transform.localScale.y;

	transform.GetComponent.<Renderer>().sharedMaterial.mainTextureScale.x = transform.localScale.x;
	transform.GetComponent.<Renderer>().sharedMaterial.mainTextureScale.y = transform.localScale.y;

}

function Start () {

}

function Update () {

}
function OnTriggerEnter(other:Collider)
{
}