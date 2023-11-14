package wififinder.mongoconnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;


@RestController
public class LocationController {
    @Autowired
    private LocationService locationService;
    @CrossOrigin
    @GetMapping("/closestLocations")
    public ResponseEntity<List<Location>> getClosestLocations(
            @RequestParam("longitude") double longitude,
            @RequestParam("latitude") double latitude
    ) {
        // Retrieve closest locations directly from the service
        List<Location> closestLocations = locationService.findClosestLocations(longitude, latitude);
        // ObjectMapper for JSON parsing
        ObjectMapper objectMapper = new ObjectMapper();
        // Parse the 'hours' string into a list for each location
        for (Location location : closestLocations) {
            try {
                
                List<BusinessHours> hoursList = objectMapper.readValue(location.getHours(), new TypeReference<List<BusinessHours>>() {});
                location.setHoursList(hoursList);
            } catch (IOException e) {
                // Handle JSON parsing errors
                e.printStackTrace();
                return ResponseEntity.badRequest().build();
            }
        }
        // Now 'closestLocations' is a List<Location> with 'hoursList' populated
        return ResponseEntity.ok(closestLocations);
    }
}




