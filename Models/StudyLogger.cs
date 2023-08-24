using story_app.Models;
public class LogMessage {
    public string message {get; set;}

    public LogMessage()
    {
        message = "";
    }
}
public class StudyLogger
{
    public string filePath {get; set;}
    public StudyLogger(string path)
    {
        // Console.Log(DateTime.Now.ToString());
        DateTime currentDateTime = DateTime.Now;

        // Generate the filename using the current date and time
        string filename = currentDateTime.ToString("yyyyMMdd_HHmmss") + ".txt";

        // Specify the path where you want to create the file
        filePath = Path.Combine(path, filename);

        // Create and write content to the file
        string content = "";
        File.WriteAllText(filePath, content);
    }

    public void AppendTextToFile(string text)
    {
        try
        {
            // Open the file for appending text
            using (StreamWriter writer = File.AppendText(filePath))
            {
                // Append the text to the file
                writer.WriteLine( DateTime.Now.ToString("HH:mm:ss: ") + text);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }


}
