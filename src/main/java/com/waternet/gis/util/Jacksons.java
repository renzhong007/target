//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.waternet.gis.util;

import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.waternet.gis.util.JacksonMapper;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

public class Jacksons {
    private ObjectMapper objectMapper = JacksonMapper.getInstance();
    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public static Jacksons json() {
        return new Jacksons();
    }

    private Jacksons() {
    }

    public Jacksons filter(String filterName, String... properties) {
        SimpleFilterProvider filterProvider = (new SimpleFilterProvider()).addFilter(filterName, SimpleBeanPropertyFilter.serializeAllExcept(properties));
        this.objectMapper.setFilters(filterProvider);
        return this;
    }

    public Jacksons addMixInAnnotations(Class<?> target, Class<?> mixinSource) {
        return this;
    }

    public Jacksons setVisiable() {
        this.objectMapper.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);
        return this;
    }

    public Jacksons setDateFormate(String dateFormat) {
        this.objectMapper.setDateFormat(new SimpleDateFormat(dateFormat));
        return this;
    }

    public JavaType getCollectionType(Class<?> collectionClass, Class... elementClasses) {
        return this.objectMapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
    }

    public Jacksons setDateFormate() {
        this.objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        return this;
    }

    public <T> T fromJsonToObject(String json, Class<T> clazz) {
        try {
            return this.objectMapper.readValue(json, clazz);
        } catch (Exception var4) {
            var4.printStackTrace();
            throw new RuntimeException("解析json错误");
        }
    }

    public String fromObjectToJson(Object object) {
        try {
            return this.objectMapper.writeValueAsString(object);
        } catch (Exception var3) {
            var3.printStackTrace();
            throw new RuntimeException("解析对象错误");
        }
    }

    public List<Map<String, Object>> fromJsonToList(String json) {
        try {
            return (List)this.objectMapper.readValue(json, List.class);
        } catch (Exception var3) {
            var3.printStackTrace();
            throw new RuntimeException("解析json错误");
        }
    }

    public static <T> T fromJsonToListBean(String jsonStr, Class<?> collectionClass, Class... elementClasses) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JavaType javaType = mapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
        return mapper.readValue(jsonStr, javaType);
    }

    public List fromJsonToListString(String json) {
        try {
            return (List)this.objectMapper.readValue(json, List.class);
        } catch (Exception var3) {
            var3.printStackTrace();
            throw new RuntimeException("解析json错误");
        }
    }

    public Map<String, Object> fromJsonToMap(String json) {
        try {
            return (Map)this.objectMapper.readValue(json, Map.class);
        } catch (Exception var3) {
            var3.printStackTrace();
            throw new RuntimeException("解析json错误");
        }
    }

    public static void main(String[] args) {
        json().setDateFormate();
    }
}
