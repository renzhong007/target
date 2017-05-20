/*  1:   */ package com.waternet.gis.pojo;
/*  2:   */ 
/*  3:   */

import com.lihs.httpBase.entity.BaseBean;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/*  4:   */
/*  5:   */
/*  6:   */
/*  7:   */
/*  8:   */

/*  9:   */
/* 10:   */ @Entity
/* 11:   */ @Table(name="model_layer_config")
/* 12:   */ public class LayerBean
/* 13:   */   extends BaseBean
/* 14:   */ {
/* 15:   */   @Id
/* 16:   */   @GeneratedValue(generator="system-uuid")
/* 17:   */   @GenericGenerator(name="system-uuid", strategy="uuid")
/* 18:   */   private String id;
/* 19:   */   private String name;
/* 20:   */   private String type;
/* 21:   */   private String layername;
/* 22:   */   private String value;
/* 23:   */   private String tooltip;
/* 24:   */   private String parentModel;
/* 25:   */   
/* 26:   */   public String getId()
/* 27:   */   {
/* 28:33 */     return this.id;
/* 29:   */   }
/* 30:   */   
/* 31:   */   public void setId(String id)
/* 32:   */   {
/* 33:36 */     this.id = id;
/* 34:   */   }
/* 35:   */   
/* 36:   */   public String getName()
/* 37:   */   {
/* 38:39 */     return this.name;
/* 39:   */   }
/* 40:   */   
/* 41:   */   public void setName(String name)
/* 42:   */   {
/* 43:42 */     this.name = name;
/* 44:   */   }
/* 45:   */   
/* 46:   */   public String getType()
/* 47:   */   {
/* 48:45 */     return this.type;
/* 49:   */   }
/* 50:   */   
/* 51:   */   public void setType(String type)
/* 52:   */   {
/* 53:48 */     this.type = type;
/* 54:   */   }
/* 55:   */   
/* 56:   */   public String getLayername()
/* 57:   */   {
/* 58:51 */     return this.layername;
/* 59:   */   }
/* 60:   */   
/* 61:   */   public void setLayername(String layername)
/* 62:   */   {
/* 63:54 */     this.layername = layername;
/* 64:   */   }
/* 65:   */   
/* 66:   */   public String getValue()
/* 67:   */   {
/* 68:57 */     return this.value;
/* 69:   */   }
/* 70:   */   
/* 71:   */   public void setValue(String value)
/* 72:   */   {
/* 73:60 */     this.value = value;
/* 74:   */   }
/* 75:   */   
/* 76:   */   public String getTooltip()
/* 77:   */   {
/* 78:63 */     return this.tooltip;
/* 79:   */   }
/* 80:   */   
/* 81:   */   public void setTooltip(String tooltip)
/* 82:   */   {
/* 83:66 */     this.tooltip = tooltip;
/* 84:   */   }
/* 85:   */   
/* 86:   */   public String getParentModel()
/* 87:   */   {
/* 88:69 */     return this.parentModel;
/* 89:   */   }
/* 90:   */   
/* 91:   */   public void setParentModel(String parentModel)
/* 92:   */   {
/* 93:72 */     this.parentModel = parentModel;
/* 94:   */   }
/* 95:   */ }



/* Location:           D:\apache-tomcat-7.0.72\webapps\webapps170429\water-gis\WEB-INF\classes\

 * Qualified Name:     com.waternet.gis.pojo.LayerBean

 * JD-Core Version:    0.7.0.1

 */