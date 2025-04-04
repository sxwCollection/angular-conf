# background description
if you want to build an angular app for different environments, you can use this environment.ts  
then build with ng build --configuration=test and run with ng serve --configuration=test  
but if you build an oic image for the angular app and use it later on cloud,  
the image is immutable and you cannot run it with different configurations.  
in this demo, a possible solution is shown.  
# idea
1. create a json file for app configurations under src/assets  
2. create an OCI image
3. create ConfigMaps with the json file for different environments 
4. mount the ConfigMaps to the pod
5. 
# use json file for configurations
1. enable json parser
in tsconfig.json/compilerOptions/
add
"resolveJsonModule": true,
"esModuleInterop": true
2. create app.config.json under src/assets
3. import json file in service/components or use InjectionToken  

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
