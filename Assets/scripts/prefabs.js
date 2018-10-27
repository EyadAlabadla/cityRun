#pragma strict

var objects:GameObject[];
var location:Vector3[];
var housesRight:GameObject;
var housesLeft:GameObject;

function Awake()
{
	for(var i:int = 0;i < objects.length;i++)
	{
		var something:GameObject;
		something = GameObject.Instantiate(objects[i],Vector3.zero,Quaternion.identity);
		something.transform.parent = transform;
		something.transform.localPosition = location[i];
	}
	
	for(var i1:int = 0;i1 < 5;i1++)
	{
		var house:GameObject = GameObject.Instantiate(housesRight,Vector3.zero,Quaternion.identity);
		house.transform.parent = transform;
		house.transform.position = Vector3(transform.position.x + transform.GetComponent.<Collider>().bounds.size.x/2 + house.transform.GetComponent.<Collider>().bounds.size.x/2,0,transform.position.z - transform.GetComponent.<Collider>().bounds.size.z/2 + house.transform.GetComponent.<Collider>().bounds.size.z/2 + i1*house.transform.GetComponent.<Collider>().bounds.size.z);
		house.transform.localPosition.y = 0;
	}
	for(var i2:int = 0;i2 < 5;i2++)
	{
		var house1:GameObject = GameObject.Instantiate(housesLeft,Vector3.zero,Quaternion.identity);
		house1.transform.parent = transform;
		house1.transform.position = Vector3(transform.position.x - transform.GetComponent.<Collider>().bounds.size.x/2 - house1.transform.GetComponent.<Collider>().bounds.size.x/2,0,transform.position.z - transform.GetComponent.<Collider>().bounds.size.z/2 + house1.transform.GetComponent.<Collider>().bounds.size.z/2 + i2*house1.transform.GetComponent.<Collider>().bounds.size.z);
		house1.transform.localPosition.y = 0;
	}
	
	
	Destroy(transform.GetComponent(prefabs));
}

function Start () {

}

function Update () {

}