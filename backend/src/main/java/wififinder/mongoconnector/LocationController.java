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
    @GetMapping("/closestPrivateLocations")
    public ResponseEntity<List<Location>> getClosestPrivateLocations(
            @RequestParam("longitude") double longitude,
            @RequestParam("latitude") double latitude
    ) {
        List<Location> closestPrivateLocations = locationService.findPrivateLocations(longitude, latitude);
        return buildResponse(closestPrivateLocations);
    }

    @CrossOrigin
    @GetMapping("/closestPublicLocations")
    public ResponseEntity<List<Location>> getClosestPublicLocations(
            @RequestParam("longitude") double longitude,
            @RequestParam("latitude") double latitude
    ) {
        List<Location> closestPublicLocations = locationService.findPublicLocations(longitude, latitude);
        return buildResponse(closestPublicLocations);
    }

    @CrossOrigin
    @GetMapping("/closestAllLocations")
    public ResponseEntity<List<Location>> getClosestAllLocations(
            @RequestParam("longitude") double longitude,
            @RequestParam("latitude") double latitude
    ) {
        List<Location> closestAllLocations = locationService.findAllLocations(longitude, latitude);
        return buildResponse(closestAllLocations);
    }

    private ResponseEntity<List<Location>> buildResponse(List<Location> locations) {
        // ObjectMapper for JSON parsing
        ObjectMapper objectMapper = new ObjectMapper();
        // Parse the 'hours' string into a list for each location
        for (Location location : locations) {
            try {
                List<BusinessHours> hoursList = objectMapper.readValue(location.getHours(), new TypeReference<List<BusinessHours>>() {});
                location.setHoursList(hoursList);
            } catch (IOException e) {
                // Handle JSON parsing errors
                e.printStackTrace();
                return ResponseEntity.badRequest().build();
            }
        }
        // Now 'locations' is a List<Location> with 'hoursList' populated
        return ResponseEntity.ok(locations);
    }
}




