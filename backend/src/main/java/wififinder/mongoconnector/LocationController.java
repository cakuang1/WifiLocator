package wififinder.mongoconnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class LocationController {
    @Autowired
    private LocationService locationService;
    @GetMapping("/closestLocations")
    public ResponseEntity<List<Location>> getClosestLocations(
            @RequestParam("longitude") double longitude,
            @RequestParam("latitude") double latitude
    ) {
        List<Location> closestLocations = locationService.findClosestLocations(longitude, latitude);
        return ResponseEntity.ok(closestLocations);
    }
}




