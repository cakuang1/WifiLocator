package wififinder.mongoconnector;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;



public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<Location> findClosestLocations(double longitude, double latitude) {
        int maxDistance = 1000; // Adjust the maximum distance as needed

        return locationRepository.findClosestLocations(longitude, latitude, maxDistance);
    }
}
