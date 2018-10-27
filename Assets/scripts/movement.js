#pragma strict

private var right:boolean = false;
private var left:boolean = false;
private var center:boolean = true;
private var hit:RaycastHit;
private var hit3:RaycastHit;
private var hit4:RaycastHit;
private var speed:float = 4;
private var jumpSpeed:float = 8;
private var mousePosDown:Vector2;
private var mousePosUp:Vector2;
var style:GUIStyle;
private var lifes:int = 3;
private var score:int = 0;
private var moveTrack:String = "";
private var canMove:boolean = true;
private var timeScale:float = 2;
private var timeScaleInc:boolean = true;
private var looseBool:boolean = false;

function Start () {

}

function Update ()
{
	if(timeScaleInc && Time.timeScale < 5)
	{
		timeScale += Time.deltaTime * 0.002;
		Time.timeScale = timeScale;
	}
	
	if(Input.GetMouseButtonDown(0))
	{
		mousePosDown = Input.mousePosition;
	}
	if(Input.GetMouseButtonUp(0))
	{
		mousePosUp = Input.mousePosition;
		
		if(direction() == "right" && canMove)
		{
			move("right");
		}
		if(direction() == "left" && canMove)
		{
			move("left");
		}
		if(direction() == "up" && Physics.Raycast(transform.position,-transform.up,transform.GetComponent.<Collider>().bounds.size.y/2))
		{
			GetComponent.<Rigidbody>().velocity.y = jumpSpeed;
		}
	}
}

function FixedUpdate()
{
	if (!looseBool)
	{
		GetComponent.<Rigidbody>().velocity.z = 8;
	}else
	{
		GetComponent.<Rigidbody>().velocity.z = 0;
	}
		
	if(right)
	{
		GetComponent.<Rigidbody>().velocity.x = (getGround().GetComponent.<Collider>().bounds.size.x/2/2 - transform.position.x) * speed;
	}
	if(left)
	{
		GetComponent.<Rigidbody>().velocity.x = (-getGround().GetComponent.<Collider>().bounds.size.x/2/2 - transform.position.x) * speed;
	}
	if(center)
	{
		GetComponent.<Rigidbody>().velocity.x = (0 - transform.position.x) * speed;
	}
}

function getGround():Transform
{
	var ground:Transform;
	if(Physics.Raycast(transform.position + transform.up*transform.GetComponent.<Collider>().bounds.size.y/2,-transform.up,hit,100,1<<8))
	{
		ground = hit.transform;
	}
	return ground;
}

function sideCheck(direction:String):boolean
{
	var bool:boolean = false;
	if(direction == "right")
	{
		if(Physics.Raycast(Vector3(getGround().GetComponent.<Collider>().bounds.size.x/2/2,transform.position.y,transform.position.z),transform.forward,5))
		{
			bool = true;
		}
	}
	if(direction == "left")
	{
		if(Physics.Raycast(Vector3(-getGround().GetComponent.<Collider>().bounds.size.x/2/2,transform.position.y,transform.position.z),transform.forward,5))
		{
			bool = true;
		}
	}
	if(direction == "center")
	{
		if(Physics.Raycast(Vector3(0,transform.position.y,transform.position.z),transform.forward,5))
		{
			bool = true;
		}
	}
	return bool;
}

function frontCheck(x:float,y:float):Transform
{
	var front:Transform;
	if(Physics.Raycast(Vector3(x,y,transform.position.z - transform.GetComponent.<Collider>().bounds.size.z/2),transform.forward,hit3,10))
	{
		front = hit3.transform;
	}
	return front;
}

function sideCheckTransform(direction:String,y:float,z:float):Transform
{
	var side:Transform;
	if(direction == "right")
	{
		if(Physics.Raycast(Vector3(transform.position.x - transform.GetComponent.<Collider>().bounds.size.x/2,y,z),transform.right,hit4,10))
		{
			side = hit4.transform;
		}
	}
	if(direction == "left")
	{
		if(Physics.Raycast(Vector3(transform.position.x + transform.GetComponent.<Collider>().bounds.size.x/2,y,z),-transform.right,hit4,10))
		{
			side = hit4.transform;
		}
	}
	return side;
}

function sideCheckBool(direction:String):boolean
{
	var bool:boolean = false;
	if(direction == "right")
	{
		if(Physics.Raycast(transform.position,transform.right,10))
		{
			bool = true;
		}
	}
	if(direction == "left")
	{
		if(Physics.Raycast(transform.position,-transform.right,10))
		{
			bool = true;
		}
	}
	return bool;
}

function direction():String
{
	var delta:Vector2 = mousePosUp - mousePosDown;
	var direction:String = "";
	if(Mathf.Abs(delta.x) > Mathf.Abs(delta.y))
	{
		if(delta.x > 0)
		{
			direction = "right";
		}else
		{
			direction = "left";
		}
	}else
	{
		if(delta.y > 0)
		{
			direction = "up";
		}else
		{
			direction = "down";
		}
	}
	delta = Vector2.zero;
	return direction;
}

function OnTriggerEnter(other:Collider)
{
	if(other.transform.tag == "coin")
	{
		other.transform.GetComponent.<Animation>().Play("extraTaken");
		other.SendMessage("removeExtra");
		score ++;
	}
	if(other.transform.tag == "barrier")
	{
		loose();
		GetComponent.<Rigidbody>().velocity.y = jumpSpeed;
	}
	if(other.transform.tag == "heart")
	{
		other.transform.GetComponent.<Animation>().Play("extraTaken");
		other.SendMessage("removeExtra");
		lifes ++;
	}
}

function OnCollisionEnter(e:Collision)
{
	var point0:Vector3 = e.contacts[0].point;
	var point1:Vector3;
	if(e.contacts.Length > 1)
	{
		point1 = e.contacts[1].point;
	}
	if(e.transform == frontCheck(point0.x,point0.y) || e.transform == frontCheck(point1.x,point1.y))
	{
		loose();
		looseBool = true;
		transform.position.z -= 0.05;
		
		if(e.transform.position.x == 0)
		{
			if(sideCheck("right") || sideCheckBool("right"))
			{
				center = false;
				left = true;
			}else
			{
				center = false;
				right = true;
			}
		}else
		{
			if(e.transform.position.x == getGround().GetComponent.<Collider>().bounds.size.x/2/2)
			{
				Debug.Log(sideCheck("center"));
				if(sideCheck("center") || sideCheckBool("left"))
				{
					right = false;
					left = true;
				}else
				{
					right = false;
					center = true;
				}
			}else
			{
				if(e.transform.position.x == -getGround().GetComponent.<Collider>().bounds.size.x/2/2)
				{
					if(sideCheck("center") || sideCheckBool("right"))
					{
						left = false;
						right = true;
					}else
					{
						left = false;
						center = true;
					}
				}
			}
		}
	}
	else if((e.transform == sideCheckTransform("right",point0.y,point0.z) || e.transform == sideCheckTransform("right",point1.y,point1.z)) && moveTrack == "goingRight")
	{
		loose();
		move("left");
	}
	else if((e.transform == sideCheckTransform("left",point0.y,point0.z) || e.transform == sideCheckTransform("left",point1.y,point1.z)) && moveTrack == "goingLeft")
	{
		loose();
		move("right");
	}
}

function OnGUI()
{
	GUI.Label(Rect(2,2,0,0),"Lifes : " + lifes,style);
	GUI.Label(Rect(2,35,0,0),"Score : " + score,style);
}

function loose()
{
	canMove = false;
	timeScaleInc = false;
	lifes--;
	var currentTimeStep:float = Time.fixedDeltaTime;
	Time.timeScale = 0.1;
	Time.fixedDeltaTime = 0.1 * currentTimeStep;
	yield WaitForSeconds(0.4);
	Time.timeScale = timeScale;
	Time.fixedDeltaTime = currentTimeStep;
	timeScaleInc = true;
	canMove = true;
	looseBool = false;
}
function move(direction:String)
{
	if(direction == "right")
	{
		if(center)
		{
			center = false;
			right = true;
		}
		if(left)
		{
			left = false;
			center = true;
		}
		moveTrack = "goingRight";
	}
	if(direction == "left")
	{
		if(center)
		{
			center = false;
			left = true;
		}
		if(right)
		{
			right = false;
			center = true;
		}
		moveTrack = "goingLeft";
	}
}