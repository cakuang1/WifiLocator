package main.java.wififinder.mongoconnector;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface LocationRepository extends MongoRepository<Location, String> {

    @Query("{name:'?0'}")
    GroceryItem findItemByName(String name);
    
    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<GroceryItem> findAll(String category);
    
    public long count();

}