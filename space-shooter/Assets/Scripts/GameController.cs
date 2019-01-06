using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameController : MonoBehaviour {

    public GameObject[] hazards;
    public Vector3 spawn_values;

    public int hazard_count;
    public int wave_count;

    public float time_between_hazards;
    public float time_between_waves;
    public float time_before_start;

    public Text score_text, restart_text, game_over_text, wave_count_text;
    private bool game_over, restart;

    private int score;

    private void Start()
    {
        game_over = false;
        restart = false;
        restart_text.text = "";
        game_over_text.text = "";
        wave_count_text.text = "";

        wave_count = 1;
        score = 0;
        wave_count_text.text = "WAVE: " + wave_count;
        UpdateScore();
        StartCoroutine(SpawnWaves());    
    }

    private void Update()
    {
        if (restart)
        {
            if (Input.GetKeyDown(KeyCode.R))
            {
                SceneManager.LoadScene("Main");
            }
        }
    }

    // Instantiate Hazards
    IEnumerator SpawnWaves()
    {

        score_text.text = "Score: " + score;
        yield return new WaitForSeconds(time_before_start);

        while (true)
        {
            for (int i = 0; i < hazard_count; i++)
            {
                Vector3 spawnPosition = new Vector3(Random.Range(-6, 6), 0, 16);
                Quaternion spawnRotation = Quaternion.identity;
                GameObject hazard = hazards[Random.Range(0, hazards.Length)];
                Instantiate(hazard, spawnPosition, spawnRotation);
                yield return new WaitForSeconds(time_between_hazards);
            }

            yield return new WaitForSeconds(time_between_waves);
            
            if (game_over)
            {
                restart_text.text = "| 'R' | Restart";
                restart = true;

                string msg = "";

                switch (wave_count)
                {
                    case 0:
                        msg = "...How embarrassing...";
                        break;
                    case 1:
                    case 2:
                    case 3:
                        msg = "Better luck next time!";
                        break;
                    case 4:
                    case 5:
                    case 6:
                        msg = "Not bad, keep going!";
                        break;
                    default:
                        msg = "Impressive work commander!";
                        break;
                }

                wave_count_text.text = "You reached wave: " + wave_count + "\n" + msg;
                break;
            }
            else
            {
                wave_count++;
                wave_count_text.text = "WAVE: " + wave_count;
            }
        }
    }

    public void AddScore(int newScoreValue)
    {
        score += newScoreValue;
        UpdateScore();
    }

    void UpdateScore()
    {
        score_text.text = "Score: " + score;
    }

    public void GameOver()
    {
        game_over_text.text = "GAME OVER!";
        game_over = true;
    }
}
