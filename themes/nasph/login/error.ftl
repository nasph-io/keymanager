<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "form">
      </div>
        <div class="container-fluid">
            <div class="float-left">
                <img src="${url.resourcesPath}/img/login-bgleft.svg" alt="left" width="20%" class="fixed-bottom"/>
            </div>
            <div class="fixed-top">
                <img src="${url.resourcesPath}/img/login-bg-right.svg" alt="right" class="float-right"  />
            </div>
            <div class="row justify-content-md-center">
                <div class="text-center my-3">
                    <img src="${url.resourcesPath}/img/home-logo.svg" class="rounded img-fluid" alt="right" width="300" height="300">
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-sm-6">
             
                    <div class="card">
                        <div class="card-body p-0">
                            <div class="p-4 m-1">
                                <h1>${kcSanitize(msg("errorTitle"))?no_esc}</h1>
                                <div id="kc-error-message">
                                    <p class="instruction">${kcSanitize(message.summary)?no_esc}</p>
                                    <#if skipLink??>
                                    <#else>
                                        <#if client?? && client.baseUrl?has_content>
                                            <p><a id="backToApplication" href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
                                        </#if>
                                    </#if>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
          
      </div>
    </#if>
</@layout.registrationLayout>