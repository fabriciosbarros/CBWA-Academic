package ie.cct.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ie.cct.entities.response;

@RestController
public class TimeController {

    @GetMapping("/timestamp/{timestamp}")
    public response timeStamp(@PathVariable("timestamp") long timestamp) {
        String utcDate = utcdate(timestamp);
        String isoDate = isodate(timestamp);
        return new response(utcDate, isoDate);
    }

    public String utcdate(Long time) {
        Date timestamp = new Date(time);
        SimpleDateFormat dateFormatUTC = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        String dateUTC = dateFormatUTC.format(timestamp);
        return dateUTC;
    }

    public String isodate(Long time) {
        Date timestamp = new Date(time);
        SimpleDateFormat dateFormatISO = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss' 'XXX");
        dateFormatISO.setTimeZone(TimeZone.getTimeZone("GMT"));
        String dateISO = dateFormatISO.format(timestamp);
        return dateISO;
    }
}