#pragma strict

private var forDelete:GameObject;
var roads:GameObject[];
private var road:GameObject[];
private var roadNum:int = 0;
private var times:int = 0;
private var roadLength:float;

function Awake()
{
	road = new GameObject[roads.length];
	
	for(var i:int = 0;i<roads.length;i++)
	{
		var something:GameObject = GameObject.Instantiate(roads[i],Vector3(0,0,-300),Quaternion.identity);
		road[i] = something;
	}
	roadLength = transform.GetComponent(movement).getGround().GetComponent.<Collider>().bounds.size.z;
	
}

function Start () {

}

function Update () {

}

function OnTriggerEnter(other:Collider)
{
	if(other.transform.tag == "access")
	{
		times ++;
		//if(forDelete != null)GameObject.Destroy(forDelete);
		roadNum = randomNum(0,road.Length,roadNum);
		//.Instantiate(road[Random.Range(0,road.Length)],Vector3(0,0,transform.GetComponent(movement).getGround().position.z + transform.GetComponent(movement).getGround().collider.bounds.size.z),Quaternion.identity);
		road[roadNum].transform.position = Vector3(0,0,times*roadLength);
		//forDelete = transform.GetComponent(movement).getGround().gameObject;
	}
}

function randomNum(min:int,max:int,exc:int):int
{
	var number:int;
	do
	{
		number = Random.Range(min,max);
	}while (number == exc);
	return number;
}