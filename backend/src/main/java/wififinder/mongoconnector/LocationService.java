package wififinder.mongoconnector;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;



@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<Location> findClosestLocations(double longitude, double latitude,String type) {
        Pageable pageable = PageRequest.of(0, 8); // Limit to the top 8 results
        return locationRepository.findClosestLocations(longitude, latitude,type, pageable);
    }

}