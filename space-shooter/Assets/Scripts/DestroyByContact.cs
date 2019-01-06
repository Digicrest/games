using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestroyByContact : MonoBehaviour {

    public GameObject explosion;
    public GameObject player_explosion;

    public int score_value;
    private GameController gameController;

    private void Start()
    {
        GameObject gameControllerObject = GameObject.FindWithTag("GameController");
        if(gameControllerObject != null)
        {
            gameController = gameControllerObject.GetComponent<GameController>();
        }

        if(gameControllerObject == null)
        {
            Debug.Log("Cannot find 'GameController' script");
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        // Destroy doesn't immediately destroy it, 
        // it marks it to be destroyed and all marked objects are destroyed at the end of the frame. 
        // So order is unimportant.
        if (other.CompareTag("Boundary") || other.CompareTag("Enemy"))
        {
            return;
        }

        if(explosion != null)
        {
            Instantiate(explosion, transform.position, transform.rotation);
        }

        if (other.CompareTag("Player"))
        {
            Instantiate(player_explosion, other.transform.position, other.transform.rotation);
            gameController.GameOver();
        }

        gameController.AddScore(score_value);        
        Destroy(other.gameObject);
        Destroy(gameObject);
    }
}
