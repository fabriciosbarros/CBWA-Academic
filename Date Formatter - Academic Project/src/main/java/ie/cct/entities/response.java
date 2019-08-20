package ie.cct.entities; 
public class response
{
    private String utcDate;
    private String isoDate;
 
    public response(String dateUTC, String dateISO)
{ 
    this.utcDate = dateUTC;
    this.isoDate = dateISO;

}

    public String getUTC()
    {
       return utcDate;
    }

    public String getISO()
    {
       return isoDate;
    }
}