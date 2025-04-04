# background description
if you want to build an angular app for different environments, you can use this environment.ts  
then build with ng build --configuration=test and run with ng serve --configuration=test  
but if you build an oic image for the angular app and use it later on cloud,  
the image is immutable and you cannot run it with different configurations.  
in this demo, a possible solution is shown.  

# idea
1. create a json file for app configurations under src/assets and use it in angular app  
2. create an OCI image
3. create ConfigMaps with the json file for different environments 
4. mount the ConfigMaps to the pod    

# use json file for configurations
1. enable json parser
in tsconfig.json/compilerOptions/    
```
"resolveJsonModule": true,    
"esModuleInterop": true
``` 
1. create app.config.json under src/assets
2. import json file in service/components (see src/app/app.component.ts) or use InjectionToken(see app.config.ts)  

# create a ConfigMap

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  app.config.json: {{ .Values.yourAppConfig | quote -}}

and in helm values:
yourAppConfig: |-
{
  "k1": "the url to earth",
  "k2": "every thing is ok"
}
```

# mount the ConfigMap to the pod
```
volumes:
  - name: app-config
    configMap:
      name: app-config

like if you use nginx to serve the angular app
volumeMounts:
  - name: app-config
    mountPath: "/usr/share/nginx/html/assets/"

```
