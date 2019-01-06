using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EvasiveManeuver : MonoBehaviour {
    public float dodge, smoothing, tilt;

    public Vector2 start_wait;
    public Vector2 maneuver_time, maneuver_wait;
    public Boundary boundary;

    private float target_maneuver, current_speed;
    private Rigidbody rb;

	// Use this for initialization
	void Start () {
        rb = GetComponent<Rigidbody>();
        current_speed = rb.velocity.z;
        StartCoroutine(Evade());
	}

    // set a target value on the x-axius and move toward it over time
    IEnumerator Evade()
    {
        yield return new WaitForSeconds(Random.Range(start_wait.x, start_wait.y));

        // repeat dodging maneuvers
        while (true)
        {
            target_maneuver = Random.Range(1, dodge) * -Mathf.Sin(transform.position.x);
            yield return new WaitForSeconds(Random.Range(maneuver_time.x, maneuver_time.y));

            target_maneuver = 0;
            yield return new WaitForSeconds(Random.Range(maneuver_wait.x, maneuver_wait.y));
        }
    }
	
	// Update is called once per frame
	void Update () {
		
	}

    private void FixedUpdate()
    {
        float new_maneuver = Mathf.MoveTowards(rb.velocity.x, target_maneuver, Time.deltaTime * smoothing);
        rb.velocity = new Vector3(new_maneuver, 0.0f, current_speed);
        rb.position = new Vector3(
           Mathf.Clamp(rb.position.x, boundary.xMin, boundary.xMax),
           0.0f,
           Mathf.Clamp(rb.position.z, boundary.zMin, boundary.zMax)
        );
        rb.rotation = Quaternion.Euler(0.0f, 0.0f, rb.velocity.x * -tilt);
    }
}
