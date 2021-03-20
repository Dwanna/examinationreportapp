package com.examinationreport.examinationreportapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer { /// Class to expose the ID


    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager=theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {


       // HttpMethod[] theUnsupportedActions= {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};

        // disable HTTP methods for Products:PUT,POST and Delete


//        disableHttpMethods(TopArtist.class,config, theUnsupportedActions);
//        disableHttpMethods(TopAlbum.class,config, theUnsupportedActions);

        //call an internal method to help expose the id
        exposeIds(config);



    }
//    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
//        config.getExposureConfiguration().forDomainType(theClass).withItemExposure((metdata,httpMethods) -> httpMethods.disable(theUnsupportedActions)).withCollectionExposure((metdata,httpMethods) -> httpMethods.disable(theUnsupportedActions));
//    }

    public void exposeIds(RepositoryRestConfiguration config) {

        //expose entity id
        /// get a list of all the entities
        Set<EntityType<?>> entities= entityManager.getMetamodel().getEntities();

        // - create an array of all entity types
        List<Class> entityClasses= new ArrayList();

        for(EntityType tempEntityType:entities) {
            entityClasses.add( tempEntityType.getJavaType());
        }

        //expose the entity Id
        Class[] domainTypes= entityClasses.toArray(new Class[0]);

        config.exposeIdsFor(domainTypes);


    }


}