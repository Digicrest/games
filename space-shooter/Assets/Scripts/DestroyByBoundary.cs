using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestroyByBoundary : MonoBehaviour {

    private GameController gameController;
    public int score_value;

    private void Start()
    {
        GameObject gameControllerObject = GameObject.FindWithTag("GameController");
        if (gameControllerObject != null)
        {
            gameController = gameControllerObject.GetComponent<GameController>();
        }

        if (gameControllerObject == null)
        {
            Debug.Log("Cannot find 'GameController' script");
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Asteroid"))
        {
            gameController.AddScore(score_value);
        }
        Destroy(other.gameObject);
    }
}
