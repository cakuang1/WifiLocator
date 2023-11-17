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


    public List<Location> findPrivateLocations(double longitude, double latitude) {
        Pageable pageable = PageRequest.of(0, 8);
        return locationRepository.findPrivateLocations(longitude, latitude, pageable);
    }

    public List<Location> findPublicLocations(double longitude, double latitude) {
        Pageable pageable = PageRequest.of(0, 8);
        return locationRepository.findPublicLocations(longitude, latitude, pageable);
    }

    public List<Location> findAllLocations(double longitude, double latitude) {
        Pageable pageable = PageRequest.of(0, 8);
        return locationRepository.findAllLocations(longitude, latitude, pageable);
    }

}